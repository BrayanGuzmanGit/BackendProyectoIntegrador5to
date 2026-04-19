const inspectionRepository = require('./inspectionRepository');
const { AppError } = require('../../shared/AppErrorAndResponse');

class InspectionService {
  async reqInspection(data, producerId) {
    const solicitud = {
      ...data,
      UIDProductor: producerId,
      Estado: 'Solicitada',
    };
    return await inspectionRepository.createSolicitud(solicitud);
  }

  async getAllSolicitudes(filters) {
    return await inspectionRepository.getSolicitudes(filters);
  }

  async fillFitosanitaria(data, technicalId) {
    const form = {
      ...data,
      UIDtecnico: technicalId
    };
    return await inspectionRepository.createFitosanitaria(form);
  }

  async fillTecnica(data, technicalId) {
    const form = { ...data };
    return await inspectionRepository.createTecnica(form);
  }

  async addLoteAndPests(loteData, pestsDataArray) {
     // Guarda lote y su estado actual
     const lote = await inspectionRepository.createInspeccionLote(loteData);
     const conteos = [];
     
     // Guarda el mapeo multivaluado si existe
     if (pestsDataArray && pestsDataArray.length > 0) {
        for (const pst of pestsDataArray) {
           const pestBody = { ...pst, idInspeccionLote: lote.id };
           const res = await inspectionRepository.addConteoPlaga(pestBody);
           conteos.push(res);
        }
     }
     return { lote, conteos };
  }
}
module.exports = new InspectionService();
