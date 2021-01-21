let OKpassword = false;
let OKrepassword = false;
window.onload = function(){
    console.log("Inside onload");
    OKpassword = false; 
    OKrepassword = false;
    updateStatusResetButton();
}
;

let updateStatusResetButton = () => 
{
    let buttonElement = document.getElementById("resetButton");
  let valueSet = !( OKpassword && OKrepassword); 
  console.log(valueSet);
  buttonElement.disabled = valueSet;
  if(valueSet)
  {
    buttonElement.style = "background-color: black";
  }
  else{
    buttonElement.style = "background-color: red";
  }
}

function validatePassword()
{
    console.log("Inside valide password");
    const newPassword = document.getElementById("newpassword-box").value ;
    const rePassword = document.getElementById("repassword-box").value ;
    let notifyElement = document.getElementById("passwordcheck-notify"); 
    if(newPassword == "" )
    {
        OKpassword = false;
        updateStatusResetButton();
        notifyElement.innerHTML = "&#10005 Password can not be empty.";
        notifyElement.style = "color:red "; 
    }
    else if(newPassword.length < 8)
    {
        OKpassword = false;
        updateStatusResetButton();
        notifyElement.innerHTML = "&#10005 The password must be at least 8 characters long!";
        notifyElement.style = "color:red "; 
    }
    else{
        validateRepassword();
        notifyElement.innerHTML = "";
        OKpassword = true; 
        console.log("Set okpassword = true")
        updateStatusResetButton();
    }
}

function validateRepassword()
{
    const rePassword = document.getElementById("repassword-box").value ;
    const notifyElement = document.getElementById("repasswordcheck-notify"); 
    const newPassword = document.getElementById("newpassword-box").value ;
    if(newPassword === rePassword && newPassword != "")
    {
        notifyElement.innerHTML = "&#10003";
        notifyElement.style = "color:#006400 "; 
        OKrepassword = true; 
        updateStatusResetButton();
    }
    else
    {
        notifyElement.innerHTML = "&#10005 this must be same with the password.";
        notifyElement.style = "color:red "; 
        OKrepassword = false;
        updateStatusResetButton(); 
    }

    
}


function changePassword()
{
   let newPassword = document.getElementById("newpassword-box").value; 
   let notifyElement = document.getElementById("repasswordcheck-notify"); 
   console.log(document.getElementById("oldpassword-box").value);
       // send change password
    $.ajax(
        {
            url: document.URL,
            type: "POST",
            data: {
                oldPassword: document.getElementById("oldpassword-box").value,
                newPassword : newPassword
            },
 
            statusCode: 
            {
             404: function () {
                 console.log("not OK");
             },
             202: function (result)
             {
                 console.log(result); 
                 if(result)
                 {
                     
                     notifyElement.innerHTML = "Password is changed, redirecting to homepage.";
 
                //     setTimeout(function () {
                //     window.location.replace("/login");
                //             }
                //    , 2000);
                 }
                 else{
                    notifyElement = document.getElementById("repasswordcheck-notify"); 
                    notifyElement.style = "color: red";
                    notifyElement.innerHTML = "Wrong old password!";
                 }
             }
            }
        }
    )
   

   
   
}

function resetNewPassword()
{
    console.log(document.URL);
    // send to api
    console.log(document.getElementById("newpassword-box").value);
    $.ajax(
        {
           
            url: document.URL,
            type: "POST",
            data: {
                newpassword: document.getElementById("newpassword-box").value, 
            },

            statusCode: {
                404: function () {
                    console.log("not OK");
                },
                202: function (result)
                {
                    console.log(result); 
                        if(result)
                        {
                            const notifyElement = document.getElementById("repasswordcheck-notify"); 
                            notifyElement.innerHTML = "Password is changed, redirecting to Login page."

                            setTimeout(function () {
                                window.location.replace("/login");
                                }
                            , 2000);
                            

                            console.log("OK");
                        }
                }
            }
        }
    )

    
}