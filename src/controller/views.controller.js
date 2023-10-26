
const getHome = async (req,res) =>{
    res.render("home");
}

const gethome2 = async (req,res) =>{
    res.render("hola")
}

export default {
    getHome,
    gethome2
}