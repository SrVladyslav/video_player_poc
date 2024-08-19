
import useSWR from 'swr';
import { trpc_client } from '@/utils/trpc_client';

export const useUsersData = () => {
    const { data, error, isLoading, mutate } = useSWR('/getAllUsers', async () => {
        return await trpc_client.user.getAllUsers.query();
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        users: data,
        isLoading,
        isError: !!error,
        mutate
    };
}