// import { store } from "../App";

import axios from "axios";
import FINAL_CONFIG from "../constants/ENVIRONMENT";
import { store } from "../Redux/Reducers";
import { user } from "../types/index";
 
// const user = store.getState();
function getBase64(file:File) {
  return new Promise((resolve)=>{

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      resolve(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  })
}
export const service = {

  events: (type:string) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  {};
      axios.get(`${FINAL_CONFIG.server_url}/api/v1/events?type=${type}`,{headers:{Authorization:`Bearer ${user.token}`}})
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  saveExpoToken: (data:{expo_token:string}) => {
    return new Promise((resolve,reject)=>{
      try {
        
        const user:user =  store.getState().user;
        axios({
          url: `${FINAL_CONFIG.server_url}/api/v1/users/expo/token`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: data
        }).then((data)=>{
          resolve(true)
          console.log("token saved successfuly");
        })
        .catch((error)=>{
          console.error("error in saving expo token",error)
          reject()
        })
      } catch (error) {
        console.error("error in saving expo token",error)
        reject()
      }

    })
  },

  enquiries: () => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  store.getState().user;
      axios.get(`${FINAL_CONFIG.server_url}/api/v1/enquiries/teacher`,{headers:{Authorization:`Bearer ${user.token}`}})
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          console.error(" enquiries: () => {",error)
          reject(error);
        });
    });
  },
  getEnquiryById: (_id:string) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  store.getState().user;
      axios.get(`${FINAL_CONFIG.server_url}/api/v1/enquiries/${_id}`,{headers:{Authorization:`Bearer ${user.token}`}})
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          console.error(" enquiries: () => {",error)
          reject(error);
        });
    });
  },
  documents: () => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  store.getState().user;
      axios.get(`${FINAL_CONFIG.server_url}/api/v1/users/documents`,{headers:{Authorization:`Bearer ${user.token}`}})
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          console.error(" enquiries: () => {",error)
          reject(error);
        });
    });
  },
  addDocuments: (data:{front:File|string,back:File|string,number:string|Blob,type:string|Blob}) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  store.getState().user;
      var bodyFormData = new FormData();
      bodyFormData.append("front",data.front)
      bodyFormData.append("back",data.back)
      bodyFormData.append("type",data.type)
      bodyFormData.append("number",data.number)
      console.log("reached here")
      axios({
        url:`${FINAL_CONFIG.server_url}/api/v1/users/document/add`,
        headers:{
          Authorization:`Bearer ${user.token}`,
          'Content-Type':'multipart/form-data',
          Accept: "application/json"
        },
        data:bodyFormData,
        method:"POST"
      })
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          console.error(" add documents: () => {",error)
          reject(error);
        });
    });
  },

  applyToEnquiry: (data:{_id:string}) => {
    return new Promise((resolve, reject) => {
      console.log('data',data)
      const user:user =  store.getState().user;
      
      axios({
        url:`${FINAL_CONFIG.server_url}/api/v1/enquiries/apply/`,
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
        data:data,
        method:"POST"
      })
        .then((response) => {
          console.log('response.data',response)
          if (response.data && response.data.Data) {
            resolve(response.data.Data);
          }
        })
        .catch((error) => {
          console.error(" add documents: () => {",error)
          reject(error);
        });
    });
  },

  deleteEvent: (data:{id:string,action:string}) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      let user:user ={token:''};
      axios.delete(`${FINAL_CONFIG.server_url}/api/v1/events/${data.id}/${data.action}`,{headers:{Authorization:`Bearer ${user.token}`}})
       
        .then((response) => {
        //   if (response.data) {
        //     resolve(response.data);
        //   }
        console.log(response);
        resolve(true)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createEvent: (data:{files:Array<File>,description:string,category:string,title:string,publish_timestamp:string}) => {
    return new Promise(async(resolve, reject) => {
      // console.log('user',user)
      var bodyFormData = new FormData();
      for (let index = 0; index < data.files.length; index++) {
        const element = data.files[index];
       
        bodyFormData.append('files',element)
      }
      
      bodyFormData.append('title',data.title)
      bodyFormData.append('description',data.description)
      bodyFormData.append('category',data.category)
      bodyFormData.append('publish_timestamp',data.publish_timestamp)
      const user:user =  {}
      axios({
        url:`${FINAL_CONFIG.server_url}/api/v1/events/create`,
        method:'POST',
        data:bodyFormData,
        headers:{
          Authorization:`Bearer ${user.token}`,
          'Content-Type':'multipart/form-data'
        },
      })
       
        .then((response) => {
        //   if (response.data) {
        //     resolve(response.data);
        //   }
        console.log(response);
        resolve(true)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  login: (data:{username:string,password:string}) => {
    return new Promise((resolve, reject) => {
      axios.post(`${FINAL_CONFIG.server_url}/api/v1/users/authenticate`, data )
        .then((response) => {
      
        console.log('response======>',response);
        resolve(response.data)
        })
        .catch((error) => {
          console.log('error in api call',error)
          reject(error);
        });
    });
  },

  signup: (data:Object) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      axios.post(`${FINAL_CONFIG.server_url}/api/v1/users/signup/teacher`,  data )
        .then((response) => {
      
        console.log(response);
        resolve(response.data)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  verifyMailOtp: (data:Object) => {
    return new Promise((resolve, reject) => {
      // console.log('user',user)
      const user:user =  store.getState().user;
      axios({
        url:`${FINAL_CONFIG.server_url}/api/v1/users/verify/mail`,
        headers:{Authorization:`Bearer ${user.token}`},
        data,
        method:"POST"
      })
        .then((response) => {
      
        console.log(response);
        resolve(response.data)
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  resendMailOtp: () => {
    return new Promise((resolve, reject) => {
      try {
        
        console.log("resend called1")
        const user:user =  store.getState().user;
        console.log('user',user.token)
        axios({
          url:`${FINAL_CONFIG.server_url}/api/v1/users/resend/mail`,
          headers:{
            Authorization:`Bearer ${user.token}`
          },
          method:"POST"
        })
        .then((response) => {
        
          console.log(response);
          resolve(response.data)
        })
        .catch((error) => {
          console.log("error in api call reend otp",error)
          reject(error);
        });
      } catch (error) {
        console.log("error in api call reend otp",error)
        reject(error);
      }
    });
  },
};
// axios.defaults.headers.common['Authorization']