import axios from 'axios';

export const getAllMovies =async()=>{
    try {
        const res = await axios.get('http://localhost:5000/api/movie/getallmovie');
        if(res.status !== 200){
            throw new Error('NO data found')
        }
        const data = res.data;
        return data;
    } catch (error) {
        console.log(error.message);
    }
}