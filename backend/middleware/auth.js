import jwt from 'jsonwebtoken'

export const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        if (!token) return res.status(401).send({ message: "token not provided" });

        let decoded=await jwt.verify(token,"This is a secret key");
        // console.log(decoded)
        req.user=decoded
        next()
    } catch (err) {
         res.status(500).send({message:"Internal server error",error:err.message})
    }
}