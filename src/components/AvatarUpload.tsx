
import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarUpdate?: (url: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUploadButton?: boolean;
}

export function AvatarUpload({ 
  currentAvatarUrl, 
  onAvatarUpdate, 
  size = 'lg',
  showUploadButton = true 
}: AvatarUploadProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const uploadAvatar = async (file: File) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type 
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) {
        throw updateError;
      }

      setAvatarUrl(publicUrl);
      onAvatarUpdate?.(publicUrl);

      toast({
        title: "Sucesso!",
        description: "Avatar atualizado com sucesso",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Erro",
        description: "Erro ao fazer upload do avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de imagem",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Erro", 
        description: "A imagem deve ter no máximo 2MB",
        variant: "destructive",
      });
      return;
    }

    await uploadAvatar(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = async () => {
    if (!user || !avatarUrl) return;

    setUploading(true);

    try {
      // Remove from storage
      const fileName = `${user.id}/avatar.jpg`;
      await supabase.storage
        .from('avatars')
        .remove([fileName]);

      // Update profile
      const { error } = await supabase
        .from('user_profiles')
        .update({ avatar_url: null })
        .eq('user_id', user.id);

      if (error) throw error;

      setAvatarUrl(undefined);
      onAvatarUpdate?.('');

      toast({
        title: "Sucesso!",
        description: "Avatar removido com sucesso",
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast({
        title: "Erro",
        description: "Erro ao remover avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getInitials = () => {
    if (!user?.user_metadata?.display_name) return 'U';
    return user.user_metadata.display_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar className={`${sizeClasses[size]} border-4 border-blue-200`}>
          <AvatarImage src={avatarUrl} alt="Avatar" />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        
        {showUploadButton && (
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-white border-2 border-blue-200 hover:bg-blue-50"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            <Camera className="w-3 h-3" />
          </Button>
        )}
      </div>

      {showUploadButton && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleUploadClick}
            disabled={uploading}
            className="flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            {uploading ? 'Enviando...' : 'Upload'}
          </Button>
          
          {avatarUrl && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRemoveAvatar}
              disabled={uploading}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <X className="w-3 h-3" />
              Remover
            </Button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
