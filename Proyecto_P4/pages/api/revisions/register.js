import {apiHandler, revisionRepo} from '/helpers/api';

export default apiHandler({
    post: register
});

async function register(req, resp){
    await revisionRepo.create(req.body);
    return resp.status(200).json({});
}