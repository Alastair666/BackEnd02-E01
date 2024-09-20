// Configura Variables del Cliente
function homePage(){
    localStorage.clear()
}
homePage()

// Creando evento de Inicio de Sesión
document.getElementById("btnSignIn").addEventListener("click", async (event)=>{
    const { value: formValuesSignIn } = await
    Swal.fire({
        title : "Sign In",
        html: `<input id="txtEmail" type="text" class="swal2-input" placeholder="Email">
            <input id="txtPsswrd" type="password" class="swal2-input" placeholder="Email">`,
        preConfirm: () => {
            const txtEm = document.getElementById("txtEmail").value
            const txtPs = document.getElementById("txtPsswrd").value
            // Validando Datos
            if (!txtEm || !txtPs)
                Swal.showValidationMessage(`Please enter user data access`)
            // Devolviendo datos del formulario
            return [
                txtEm,
                txtPs
            ];
        },
        allowOutsideClick : false,
        showCancelButton: true,
    })
    
    if (formValuesSignIn){
        console.log(formValuesSignIn)
        await authUser(formValuesSignIn)
    }
})
// Creando evento de Inicio de Sesión
document.getElementById("btnSignUp").addEventListener("click", async (event)=>{
    const { value: formValuesSignUp } = await
    Swal.fire({
        title : "Sign Up",
        html: `
            <input id="txtFirstName" type="text" class="swal2-input" placeholder="First name">
            <input id="txtLastName" type="text" class="swal2-input" placeholder="Last name">
            <input id="txtEmail" type="text" class="swal2-input" placeholder="Email">
            <input id="txtPsswrd" type="password" class="swal2-input" placeholder="Email">
            <input id="txtAge" type="number" class="swal2-input" placeholder="Age">
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const txtFN = document.getElementById("txtFirstName").value
            const txtLN = document.getElementById("txtLastName").value
            const txtEm = document.getElementById("txtEmail").value
            const txtPs = document.getElementById("txtPsswrd").value
            const txtAg = document.getElementById("txtAge").value

            if (!txtFN || !txtLN || !txtEm || !txtPs || !txtAg )
                Swal.showValidationMessage(`Please enter user data register`)
            
            return [
                txtFN,
                txtLN,
                txtEm,
                txtPs,
                txtAg
            ];
        },
        allowOutsideClick : false
    })
    if (formValuesSignUp){
        console.log(formValuesSignUp)
        await registerUser(formValuesSignUp)
    }
})

async function authUser(loginArray) {
    try {
        
        const response = await fetch(`/api/sessions/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: loginArray[0], password: loginArray[1] })
        })
        //Validando Respuesta
        const jsonRes = await response.json()
        console.warn(jsonRes)
        if (response.ok){
            if (jsonRes.result === "success"){
                localStorage.removeItem("userEF")
                localStorage.setItem("userEF", JSON.stringify(jsonRes.payload))
                location.href = "/products"
            }
            else {
                alert(`Sign In Errors: ${jsonRes.errors}`)
            }
        }
        else {
            console.error(`Auth Method error:`, jsonRes)
            alert(`The user ${email} was not found`)
        }
    }
    catch (error) {
        console.error(`There are problems with the registration method: `, error)
        alert(`The user ${email} wasn't registered, see the console for more details`)
    }
}

async function registerUser(userArray) {
    try {
        const response = await fetch(`/api/sessions/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: userArray[0], lastName: userArray[1], email: userArray[2] })
        })
        //Validando Respuesta
        if (response.ok){
            const jsonRes = await response.json()
            if (jsonRes.result === "success"){
                console.log(jsonRes)
                alert(`The user ${userArray[2]} was registered`)
            }
            else {
                alert(`Register Errors: ${jsonRes.errors}`)
            }
        }
        else {
            console.error(`There are problems with the registration method: `, response.statusText)
            alert(`The user ${userArray[2]} wasn't registered: ${response.statusText}`)
        }
    }
    catch (error) {
        console.error(`There are problems with the registration method: `, error)
        alert(`The user ${userArray[2]} wasn't registered, see the console for more details`)
    }
}   