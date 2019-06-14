
const nodemailer=require('nodemailer')


//var transporter = nodemailer.createTransport('smtps://396852378@qq.com:A3o81Q84@smtp.qq.com');
var transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    user: 'psy9072@163.com', // generated ethereal user
    pass: 'Scutp2p255' // generated ethereal password
}
});

module.exports = function(email,code){
    var mailOptions = {   
        from: "psy9072@163.com", //发信邮箱
        to: email, //接收者邮箱
        subject: "验证电子邮箱", //邮件主题
        text: "您好！",
        html: `<p>感谢您的注册，请点击这里激活您的账号</p>
     <p><a href="http://localhost:3000/users/checkCode?email=${email}&code=${code}">http://localhost:3000/users/checkCode?email=${email}&code=${code}</a></p>
     <p>祝您使用愉快，使用过程中您有任何问题请及时联系我们。</p>
     <p>温馨提示：不要泄漏给其他人，如果无法点击，请复制地址粘贴到浏览器地址栏中按回车。</p>`
     };
     transporter.sendMail(mailOptions, function(error, info) {   
         if (error) {       
             return console.log(error);   
         }   
         console.log('Message sent: ' + info.response);
     });
}




