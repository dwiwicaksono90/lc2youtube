<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">LC2</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" >Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">trending</a>
                    </li>
                </ul>
                <!-- notif -->
                <div class="alert alert-warning notif" role="alert" v-if="warningText">
                    {{ warningText }}
                </div>
                <div class="alert alert-success notif" role="alert" v-if="successText">
                    {{ successText }}
                </div>

                <div class="form-inline my-2 my-lg-0">
                    <div v-if="!user">
                        <input type="text" placeholder="email" v-model="loginEmail">
                        <input type="text" placeholder="password" v-model="loginPassword">
                        <button class="btn btnN" @click="login">Login</button>
                        <button type="button" class="btn btn-primary BtnN" data-toggle="modal" data-target="#modal-register" v-if="!user">Register</button>
                    </div>
                    <div>
                    <button class="btn btnN" @click="logout" v-if="user">Logout</button>
                    </div>
                    
                </div>
            </div>
        </nav>

<!-- register -->
        <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name" required v-model='registerName'>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="registerPassword" placeholder="Password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="register">Submit</button>
                    </div>
                </div>
            </div>
        </div>


    </div>


</template>

<script>
    import {mapActions, mapState} from "vuex"

    export default {
        name: 'navbar',
        data(){
            return {
                server: 'http://localhost:3000',
                registerName: '',
                registerEmail: '',
                registerPassword: '',
                loginEmail: '',
                loginPassword: '',
                warningText: '',
                successText: ''
            }
        },
        created(){
            this.getUser()
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
             ...mapActions(["getUser"]),
            login(){
               if(this.loginEmail === '' || this.loginPassword === ''){
                    this.getWarning('email and password must require!')
                } else {
                    axios({
                        method: 'POST',
                        url: `${this.server}/users/login`,
                        data: {
                            email: this.loginEmail,
                            password: this.loginPassword
                        }
                    })
                    .then((result) => {
                        console.log(result.data.msg);
                        localStorage.setItem('tokenLC2', result.data.token)
                        this.getSuccess('Login Succeess')
                        this.getClear()
                        this.getUser()
                        // this.$router.push('/')
                    }).catch((err) => {
                        this.loginPassword = ''
                        this.getWarning(err.response.data.msg)
                        // console.log(err.response.data.msg);
                    });
                }            
            },
            logout(){
                localStorage.removeItem('tokenLC2')
                this.getUser()
            },
            register(){
                axios({
                method: 'POST',
                url: `${this.server}/users`,
                data: {
                    name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                    }
                })
                .then((result) => {
                    this.getClear()
                    this.getSuccess('Register Success :)')
                    console.log(result);
                    
                }).catch((err) => {
                    console.log(err.response.data.message);
                    this.getWarning(err.response.data.message)
                    this.registerPassword = ''
                });
            },
            getWarning(text){
                this.warningText = text 
                setTimeout(() => { 
                    this.warningText = null
                }, 1000);
            },
            getSuccess(text){
                this.successText = text 
                setTimeout(() => { 
                    this.successText = null
                }, 1000);
            },
            getClear(){
                this.registerName = '',
                this.registerEmail = '',
                this.registerPassword = '',
                this.loginEmail = '',
                this.loginPassword = ''
            }

        }
    }
// 
</script>

<style>
.btnN{
    margin: 5px;
}
.notif {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
}
</style>
