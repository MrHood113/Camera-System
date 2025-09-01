import { useMutation, useQueryClient } from "@tanstack/react-query";
import userImageApi from "../api/userImageApi";
import type { Avatar, Background, User } from "../types/user.type";

type ImageType = "avatar" | "background";

export const useUserImage = (type: ImageType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      if (type === "avatar") {
        return userImageApi.updateAvatar(id, file) as Promise<Avatar>;
      }
      return userImageApi.updateBackground(id, file) as Promise<Background>;
    },
    onMutate: async ({ id, file }) => {
      await queryClient.cancelQueries({ queryKey: ["user", id] });

      const previousUser = queryClient.getQueryData<User>(["user", id]);

      if (previousUser) {
        const newImageUrl = URL.createObjectURL(file);
        queryClient.setQueryData<User>(["user", id], {
          ...previousUser,
          [type]: newImageUrl,
        });
      }

      return { previousUser };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user", id], context.previousUser);
      }
    },
    onSuccess: (id, file) => {
      console.log("Avatar upload success, server returned:", file);
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useAvatar = () => useUserImage("avatar");
export const useBackground = () => useUserImage("background");