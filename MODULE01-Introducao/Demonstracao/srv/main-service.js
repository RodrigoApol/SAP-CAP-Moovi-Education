import cds from '@sap/cds';

export default (service) => {
    service.on('getPersonById', async (req) => {
        const { id } = req.data;
        const swapi = await cds.connect.to('STAR_WARS_API');
        const response = await swapi.get(`/people/${id}/`);

        return {
            person: {
                name: response.name,
                height: response.height,
                mass: response.mass,
                gender: response.gender
            }
        }
    });
};