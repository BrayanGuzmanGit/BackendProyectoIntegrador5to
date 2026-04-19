const locationRepository = require('./locationRepository');

class LocationService {
  async registerPredio(data, ownerId) {
    const predioData = {
      ...data,
      id_usuario_propietario: ownerId
    };
    return await locationRepository.createPredio(predioData);
  }

  async registerLugarProduccion(dataLugar, producerId) {
    try {
      const lugarBody = {
        //el id se genera automaticamente en supabase
        numero_registro: dataLugar.numero_registro,
        nombre: dataLugar.nombre,
        direccion: null, //La direccion es dada por el predio central del lugar de produccion
        uidproductor: producerId.id,
      };
      return await locationRepository.createLugarProduccion(lugarBody);
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  async assignLugarToPredio(lugarId, predioId, ownerId) {
    return await locationRepository.linkLugarToPredio(lugarId, predioId, ownerId);
  }

  async getMyPredios(ownerId) {
    return await locationRepository.getPrediosByUser(ownerId);
  }

  async getDepartamentos() {
    return await locationRepository.getDepartamentos();
  }

  async getMunicipios() {
    return await locationRepository.getMunicipios();
  }

  //===LOTES
  async registerLot(data) {
    // Si necesitas validar que el lugar de produccion pertenezca al productor,
    // se podría hacer una consulta extra al 'locationRepository'. 
    // Por simplicidad y eficiencia de MVP, registramos el dato proveniente del request.
    return await locationRepository.createLot(data);
  }

  async getLotesPorLugar(id_lugar) {

    return await locationRepository.getLotesPorLugar(id_lugar);
  }

  async getMyLugares(id_productor) {
    return await locationRepository.getLugaresByProductor(id_productor);
  }
}
module.exports = new LocationService();
