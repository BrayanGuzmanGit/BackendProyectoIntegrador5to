const inspectionService = require('./inspectionService');
const { ApiResponse } = require('../../shared/AppErrorAndResponse');

class InspectionController {
  async solicitInspection(req, res, next) {
    try {
      // req.user viene del crossServiceAuth middleware (Validado en ms-1)
      const result = await inspectionService.reqInspection(req.body, req.user.id);
      return ApiResponse.success(res, result, 'Solicitud de Inspección creada', 201);
    } catch (err) { next(err); }
  }

  async fetchSolicitudes(req, res, next) {
    try {
      const result = await inspectionService.getAllSolicitudes(req.query);
      return ApiResponse.success(res, result, 'Solicitudes recuperadas');
    } catch(err) { next(err); }
  }

  async submitFito(req, res, next) {
    try {
      const result = await inspectionService.fillFitosanitaria(req.body, req.user.id);
      return ApiResponse.success(res, result, 'Acta de Inspección Fitosanitaria creada', 201);
    } catch (err) { next(err); }
  }

  async submitTecnica(req, res, next) {
     try {
      const result = await inspectionService.fillTecnica(req.body, req.user.id);
      return ApiResponse.success(res, result, 'Acta de Inspección Técnica creada', 201);
    } catch (err) { next(err); }
  }

  async addLoteWithPests(req, res, next) {
    try {
      // Expect: { inspeccionLote: {...}, conteosPlagas: [{...}, {...}] }
      const { inspeccionLote, conteosPlagas } = req.body;
      const result = await inspectionService.addLoteAndPests(inspeccionLote, conteosPlagas);
      return ApiResponse.success(res, result, 'Inspección de Lote y Plagas procesada', 201);
    } catch (err) { next(err); }
  }
}
module.exports = new InspectionController();
