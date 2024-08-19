
import useSWR from 'swr';
import { trpc_client } from '@/utils/trpc_client';

/**Obtains the user data from the server given its id 
 * 
 * TODO: add auth token for the query, etc, this is just a POC
*/
export const useUserData = (id:string) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/getUserData/?token=${id}`, 
        async () => {
            return await trpc_client.user.getUser.query({id:id});
    }, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    
    if(id.length === 0) return {
        user: null,
        isLoading: false,
        isError: false,
        mutate: () => {}
    }

    return {
        user: data,
        isLoading,
        isError: !!error,
        mutate
    };
}