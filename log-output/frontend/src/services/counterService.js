import axios from 'axios'


export const getCounter = async () => {
  const counter = await axios.get('http://localhost:8081/a')
  return counter.data
}

export const getTimeStamp = async () => {
  const timeStamp = await axios.get('http://localhost:3001/')
  console.log('timestamp', timeStamp)
  return timeStamp.data
}