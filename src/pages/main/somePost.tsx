import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { Post } from './main'
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './somePost.css';

interface Props {
    postFromFirestore: Post;
}

interface Like {
    userId: string;
    likeId: string;
}

export const SomePost = (props: Props) => {
    const { postFromFirestore } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null) // likes является массивом, в котором будут объекты

    const likesRef = collection(db, 'likes');
    const likesDoc = query(likesRef, where('postId', '==', postFromFirestore.id)) // отбираем из коллекции пост postId: postFromFirestore.id

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))  // length нашего возвращаемого массива равен количеству лайков на посте
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: postFromFirestore.id });
            if (user) {     // используем здесь optimistic rendering, чтобы наш палец автоматически поднимался / опускался
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        }
        catch (err) { console.log('sxal ka') }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query( // выбираем лайк, который хотим убрать
                likesRef,
                where('postId', '==', postFromFirestore.id),
                where('userId', '==', user?.uid)
            )
            const likeToDeleteData = await getDocs(likeToDeleteQuery); // получаем data этого лайка
            const likeId = likeToDeleteData.docs[0].id;  // получаем id из data
            const likeToDelete = doc(db, 'likes', likeId)  // созадем референс
            await deleteDoc(likeToDelete); // удаляем лайк наконец

            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId)) // с помощью фильтра убираем отсюда лайки, которые мы удалили сверху
            }
        }
        catch (err) { console.log('sxal ka') }
    }

    return (
        <div className="post-container">
            <p className='author'> @{postFromFirestore.userName}</p>

            <div className="post-content">
                <div> {postFromFirestore.description} </div>
            </div>
            <div className="footer">
                <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <> &#128078; </> : <>&#128077;</>} </button>

                <div className="likes">
                    <p>{likes ? likes.length : 0} Likes</p>
                </div>
            </div>
        </div>
    )
}