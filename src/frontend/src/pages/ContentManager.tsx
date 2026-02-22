import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetAllContents,
  useCreateContent,
  useUpdateContent,
  useDeleteContent,
} from '@/hooks/useContentOperations';
import type { Content } from '@/backend';

export default function ContentManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', title: '', body: '' });

  const { data: contents = [], isLoading } = useGetAllContents();
  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent();
  const deleteMutation = useDeleteContent();

  const handleCreate = async () => {
    if (!formData.id || !formData.title || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createMutation.mutateAsync({
        id: formData.id,
        title: formData.title,
        body: formData.body,
      });
      toast.success('Content created successfully!');
      setFormData({ id: '', title: '', body: '' });
      setIsCreating(false);
    } catch (error) {
      toast.error('Failed to create content');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.title || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id,
        title: formData.title,
        body: formData.body,
      });
      toast.success('Content updated successfully!');
      setEditingId(null);
      setFormData({ id: '', title: '', body: '' });
    } catch (error) {
      toast.error('Failed to update content');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Content deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete content');
    }
  };

  const startEdit = (id: string, content: Content) => {
    setEditingId(id);
    setFormData({ id, title: content.title, body: content.body });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ id: '', title: '', body: '' });
  };

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Content{' '}
          <span className="bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
            Manager
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Create, edit, and manage your content with ease. All data is securely stored on the Internet Computer.
        </p>
      </div>

      {/* Create Button */}
      {!isCreating && !editingId && (
        <div className="mb-8">
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Content
          </Button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="mb-8 border-2 border-coral/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isCreating ? 'Create New Content' : 'Edit Content'}
            </CardTitle>
            <CardDescription>
              {isCreating
                ? 'Fill in the details below to create new content'
                : 'Update the content details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isCreating && (
              <div className="space-y-2">
                <Label htmlFor="id">Content ID</Label>
                <Input
                  id="id"
                  placeholder="unique-content-id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="border-2"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter content title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder="Enter content body"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={6}
                className="border-2"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={isCreating ? handleCreate : () => handleUpdate(formData.id)}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity"
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <Save className="mr-2 h-4 w-4" />
                {isCreating ? 'Create' : 'Update'}
              </Button>
              <Button onClick={cancelEdit} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Content</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-coral" />
          </div>
        ) : contents.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                No content yet. Create your first piece of content to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((content, index) => {
              const contentId = `content-${index}`;
              const isEditing = editingId === contentId;

              return (
                <Card
                  key={index}
                  className={`transition-all duration-300 hover:shadow-lg ${
                    isEditing ? 'border-2 border-teal shadow-lg shadow-teal/20' : 'border-2 border-border/50'
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{content.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">{content.body}</p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(contentId, content)}
                        disabled={deleteMutation.isPending}
                        className="flex-1 border-teal/20 hover:bg-teal/10 hover:text-teal"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(contentId)}
                        disabled={deleteMutation.isPending}
                        className="flex-1 border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
