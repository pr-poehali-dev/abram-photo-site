import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  url: string;
  title: string;
}

interface Album {
  id: number;
  title: string;
  coverPhoto: string;
  photos: Photo[];
  photosCount: number;
}

export default function Index() {
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      title: 'Природа',
      coverPhoto: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/6313c88b-5fa8-4a04-873c-a9626eae6cb0.jpg',
      photosCount: 24,
      photos: [
        { id: 1, url: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/6313c88b-5fa8-4a04-873c-a9626eae6cb0.jpg', title: 'Горы' },
      ]
    },
    {
      id: 2,
      title: 'Город',
      coverPhoto: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/83b1de54-e3c4-47af-8fbc-27fef6c12770.jpg',
      photosCount: 18,
      photos: [
        { id: 2, url: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/83b1de54-e3c4-47af-8fbc-27fef6c12770.jpg', title: 'Ночь' },
      ]
    },
    {
      id: 3,
      title: 'Макро',
      coverPhoto: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/921e554a-511e-4ac7-b7b1-c7481ba85579.jpg',
      photosCount: 32,
      photos: [
        { id: 3, url: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/921e554a-511e-4ac7-b7b1-c7481ba85579.jpg', title: 'Цветы' },
      ]
    }
  ]);

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isAddAlbumOpen, setIsAddAlbumOpen] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddAlbum = () => {
    if (newAlbumTitle.trim()) {
      const newAlbum: Album = {
        id: albums.length + 1,
        title: newAlbumTitle,
        coverPhoto: 'https://cdn.poehali.dev/projects/1326fa6f-825a-4b42-9e91-38051e743c47/files/6313c88b-5fa8-4a04-873c-a9626eae6cb0.jpg',
        photosCount: 0,
        photos: []
      };
      setAlbums([...albums, newAlbum]);
      setNewAlbumTitle('');
      setIsAddAlbumOpen(false);
    }
  };

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral/10 via-sky-blue/10 to-turquoise/10">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-coral via-sky-blue to-turquoise bg-clip-text text-transparent mb-2">
                Абрам.ру
              </h1>
              <p className="text-muted-foreground text-lg">Галерея моих фотографий</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 sm:min-w-[300px]">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Найти альбом..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm border-2 focus:border-coral transition-colors"
                />
              </div>
              
              <Button 
                onClick={() => setIsAddAlbumOpen(true)}
                className="bg-gradient-to-r from-coral to-primary hover:from-coral/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon name="Plus" className="mr-2" size={20} />
                Новый альбом
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlbums.map((album, index) => (
            <Card 
              key={album.id}
              className="group cursor-pointer overflow-hidden border-2 hover:border-coral transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/90 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={album.coverPhoto} 
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <Icon name="Image" size={18} />
                    <span className="text-sm font-medium">{album.photosCount} фото</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold text-slate group-hover:text-coral transition-colors duration-300">
                  {album.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="FolderOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">Альбомы не найдены</p>
          </div>
        )}

        <Dialog open={!!selectedAlbum} onOpenChange={() => setSelectedAlbum(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-coral to-turquoise bg-clip-text text-transparent">
                {selectedAlbum?.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {selectedAlbum?.photos.map((photo) => (
                <div 
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-lg cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
              
              <button className="aspect-square border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-coral hover:bg-coral/5 transition-all duration-300 group">
                <Icon name="Plus" size={32} className="text-muted-foreground group-hover:text-coral transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-coral transition-colors">Добавить фото</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
            <div className="relative">
              <img 
                src={selectedPhoto?.url} 
                alt={selectedPhoto?.title}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setSelectedPhoto(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddAlbumOpen} onOpenChange={setIsAddAlbumOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Создать новый альбом</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Название альбома</label>
                <Input 
                  placeholder="Введите название..." 
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAlbum()}
                  className="border-2 focus:border-coral"
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddAlbumOpen(false)}
                >
                  Отмена
                </Button>
                <Button 
                  onClick={handleAddAlbum}
                  className="bg-gradient-to-r from-coral to-primary hover:from-coral/90 hover:to-primary/90"
                  disabled={!newAlbumTitle.trim()}
                >
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
