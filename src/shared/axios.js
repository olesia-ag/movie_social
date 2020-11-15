import axios from 'axios'


export const axiosFirebase = axios.create({
  baseURL: 'https://movie-social-28fe3.firebaseio.com/'
})


