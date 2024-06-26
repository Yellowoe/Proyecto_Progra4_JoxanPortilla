import { apiHandler, userRepo_2 } from '/helpers/api';

export default apiHandler({
    get: getById,    
});

async function getById(req, res){
    const { id } = req.query;
    console.log('API getById called with ID:', id);

    const user = await userRepo_2.getById(id);
    console.log('User fetched from repo:', user);

    if (!user) {
        console.error('User not found for ID:', id);
        throw 'User not found';
    }
    
    return res.status(200).json(user);
}
