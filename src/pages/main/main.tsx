import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { SomePost } from './somePost';


export interface Post {
        id: string;
        userId: string;
        title: string;
        userName: string;
        description: string;
}

export const Main = () => {
        
        const [postList, setPostList] = useState<Post[] | null>(null)
        const postsRef = collection(db, 'cucak');
        
        const getPosts = async () => {
                const data = await getDocs(postsRef);
                setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[])
        }
        
        useEffect(() => {
           getPosts();
        }, [])
        return <div> {postList?.map((post)=> <SomePost postFromFirestore={post} />)} </div>
        
}