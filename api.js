// module.exports = function (app, db) {

//     app.get('/api/test', function (req, res) {
//         res.json({
//             username: 'joe'
//         });
//     });

//     // app.get('/api/login', function (req, res) {

//     // })
//     app.get('/api/user', async function (req, res) {

//         let user = await db.manyOrOne('select * from love_user');
//         console.log(user);



//         res.json({
//             data: user
//         })
//     });

// }
