$('#form').validate({
	rules:{
		fname:"required",
        lname:"required" ,
		email:{
			required:true,
			email:true
		},
		password:{
			required:true,
			minlength:8
		},
        ConfrmPassword: {
            required:true , 
            minlength:8
        }
        
	},
    
    messages:{
		fname:{required:'Please enter your name'},
        lname:{required:'Please enter your name'},
        
		email:{
			required:'Please enter email',
			email:'Please enter valid email',
		},
		password:{
			required:'Please enter your password',
			minlength:'Password must be 5 char long'
		},

    },
  

	},
	
);