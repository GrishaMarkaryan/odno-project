import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    interface CreateFormData {
        title: string;
        description: string;
    }

    const schema = yup.object().shape({
        title: yup.string().required('Mi anun greq stex'),
        description: yup.string().required('Mi ban greq stex'),
      })
    
    const { register, handleSubmit, formState: {errors} } = useForm <CreateFormData>({
        resolver: yupResolver(schema)
    })  

    const postsRef = collection(db, 'cucak'); // т.е. создали ссылку к коллекции cucak
    
    const onCreatePost = async (data: CreateFormData) => { // передаем в базу данных информацию 
        await addDoc(postsRef, {      // в коллекцию cucak передаем документ из 4-х элементов (title, descr-n, userName, userId)
          title: data.title,
          description: data.description, // можно вместо этих 2 строк написать ...data,
          userName: user?.displayName,
          userId: user?.uid,
        }) 
        navigate('/');
    }

    return (
      <form  onSubmit={handleSubmit(onCreatePost)} >
        <input placeholder="Title.." {...register('title')} />
        <p style={{color: "red"}}> {errors.title?.message} </p>
        <textarea placeholder="Description.." {...register('description')} />
        <p style={{color: "red"}}> {errors.description?.message} </p>
        <input type="submit" />
      </form>
    )
}