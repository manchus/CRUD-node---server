$(function(){
  console.log("script ok !");

  document.getElementById("boutton2").addEventListener("click",function()
  {
      var codeaffiche = document.getElementById("codechoisi").value;
      $.ajax("/ecoledbajaxRead",{
          type:"GET",
          data:{codeaffiche : codeaffiche},
          success: function(data){  //data contient les informations reçues de monApp 
              console.log(data);
              document.getElementById("nom").value = data.infoclient[0].nom;
              document.getElementById("prenom").value = data.infoclient[0].prenom; 
          },
          error: function(){
              console.log("error!!!!");
          }
      });
  });


  document.getElementById("insert").addEventListener("click",function()  {
      var nom = document.getElementById("nom").value;
      var prenom = document.getElementById("prenom").value;
      $.ajax("/ecoledbajaxWrite",{
          type:"POST",
          data : {nom: nom, prenom: prenom},     
          success: function(data){
            console.log('ok');
            window.location.reload();
            document.getElementById("nom").value = " ";
            document.getElementById("prenom").value = " ";
          },
          error:function(){
            console.log('error!')
          }
     });
  });


});

   