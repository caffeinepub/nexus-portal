import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Content, ContentId } from '@/backend';

export function useGetAllContents() {
  const { actor, isFetching } = useActor();

  return useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContent(id: ContentId) {
  const { actor, isFetching } = useActor();

  return useQuery<Content>({
    queryKey: ['content', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getContent(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useCreateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, body }: { id: ContentId; title: string; body: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createContent(id, title, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
}

export function useUpdateContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, body }: { id: ContentId; title: string; body: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updateContent(id, title, body);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.invalidateQueries({ queryKey: ['content', variables.id] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ContentId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteContent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
}
