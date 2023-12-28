function gPOnLoad(){
    // G+ api loaded
    document.getElementById('gp_login').style.display = 'block';
}
function googleAuth() {
   googleKey = "fa0cf409504dce0ca5418f91687c6dec7e76dbd9" 
   gapi.auth.signIn({       
       callback: gPSignInCallback,
       clientid: googleKey,
       cookiepolicy: "single_host_origin",
       requestvisibleactions: "http://schema.org/AddAction",
       scope: "https://www.googleapis.com/auth/plus.login email"
   })
}

function gPSignInCallback(e) {
   if (e["status"]["signed_in"]) {
       gapi.client.load("plus", "v1", function() {
           if (e["access_token"]) {
               getProfile()
           } else if (e["error"]) {
               console.log("There was an error: " + e["error"])
           }
       })
   } else {
       console.log("Sign-in state: " + e["error"])
   }
}

function getProfile() {
   var e = gapi.client.plus.people.get({
       userId: "me"
   });
   e.execute(function(e) {
       if (e.error) {
           console.log(e.message);
           return
       } else if (e.id) {
           // save profile data
       }
   })
}(function() {
   var e = document.createElement("script");
   e.type = "text/javascript";
   e.async = true;
   e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
   var t = document.getElementsByTagName("script")[0];
   t.parentNode.insertBefore(e, t)
})()