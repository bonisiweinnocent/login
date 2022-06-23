// document.addEventListener('alpine:init', () => {
//     Alpine.data('users', () => {


//         return {
//             init() {
//             },
//             users: [],
//             email: "",
//             password: "",


//             registerUser() {
//                 fetch(`/auth/signup?email=${this.email}&password=${this.password}`)
//                     .then(r => r.json())
//                     .then(usersData => this.users = usersData.data)

//                     console.log(this.usersData);
//             },

//         }

//     });

// })