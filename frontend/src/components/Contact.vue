<template>
  <div>
    <h2 class="text-center py-3">Drop Us A Line🙂</h2>
    <div class="container">
      <div class="content mb-4">
    
         <div class="content mb-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.839271244068!2d18.590175975423115!3d-33.99666197317795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc450aa3634887%3A0x3b4dab4be975b211!2s87%20Ingqanga%20Cres%2C%20Crossroads%2C%20Cape%20Town%2C%207750!5e0!3m2!1sen!2sza!4v1688567720311!5m2!1sen!2sza" width="1400" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      
      <form @submit="submitForm" class="contact m-auto mb-5">
        <div>
          <p>Full name</p>
          <label>
            <input
              class="flex"
              type="text"
              v-model.trim="fullName"
              required
              placeholder="Full name"
            >
          </label>
        </div>
        <div>
          <p>Email</p>
          <label>
            <input
              class="flex"
              type="email"
              v-model.trim="email"
              required
              placeholder="Email"
            >
          </label>
        </div>
        <div>
          <p>Subject</p>
          <label>
            <input
              class="flex"
              type="text"
              v-model.trim="subject"
              required
              placeholder="Subject"
            >
          </label>
        </div>
        <div>
          <p>Message</p>
          <label>
            <textarea
              name="message"
              class="message"
              v-model.trim="message"
              required
              placeholder="Your message"
            ></textarea>
          </label>
        </div>
        <div>
          <button class="btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    };
  },
  methods: {
    submitForm(event) {
      if (!this.isFormValid()) {
        event.preventDefault();
        
        return;
      }
      
    },
    isFormValid() {
      return (
        this.fullName.length > 0 &&
        this.email.length > 0 &&
        this.subject.length > 0 &&
        this.message.length > 0
      );
    },
  },
};
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
}


.contact{
    background-image: url(https://i.postimg.cc/Tw1QFSTG/desktop-wallpaper-novak-djokovic-serbian-tennis-players-atp-neon-atp.jpg);
    background-position:center;
    display: flex;
    flex-direction: column;
    width: 30%;
    min-height: 20vh;
    align-items: center;
    border-radius: 8px;
    margin-inline: auto;
    margin-bottom: 60px;

}

.content{
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
}

input{
    background-color: rgb(227, 150, 234);
    color: ghostwhite;
    margin-top: 8px;
    width: 300px;
    height: 40px;
    border-radius: 8px;
    border: 2px rgb(35, 32, 34) solid;
    
}
.message{
    background-color: rgb(231, 173, 231);
    width: 300px;
    height: 80px;
    margin-top: 8px;
    border: 2px rgb(28, 25, 27) solid;
    border-radius: 8px;
}

.btn{
    margin-top: 20px;
    width: 80px;
    border-radius: 6px;
    margin-bottom: 20px;

}

.btn:hover{
    background-color: blueviolet;
}
p{
    color:aliceblue;
    margin-top:10px;
}


@media screen and (max-width: 700px) {
    .content{
        display: none;
    }
    .contact{
        width: 100%;
    }

    input{
        width: 100%;
    }

     .message{
        width: 200px;
     }
}
    
</style>