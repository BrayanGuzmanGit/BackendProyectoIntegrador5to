const locationService = require('./locationService');
const ApiResponse = require('../../shared/ApiResponse');

class LocationController {
  async createPredio(req, res, next) {
    try {
      const predio = await locationService.registerPredio(req.body, req.user.id);
      return ApiResponse.success(res, predio, 'Predio creado existosamente', 201);
    } catch (error) {
      next(error);
    }
  }

  async getMyPredios(req, res, next) {
    try {
      const predios = await locationService.getMyPredios(req.user.id);
      return ApiResponse.success(res, predios, 'Predios obtenidos');
    } catch (error) {
      next(error);
    }
  }

  async createLugarProduccion(req, res, next) {
    try {
      const lugar = await locationService.registerLugarProduccion(req.body, req.user.id);
      return ApiResponse.success(res, lugar, 'Lugar de Producción creado', 201);
    } catch (error) {
      next(error);
    }
  }

  async linkLugarPredio(req, res, next) {
    try {
      const { lugarId, predioId } = req.body;
      const updatedPredio = await locationService.assignLugarToPredio(lugarId, predioId, req.user.id);
      return ApiResponse.success(res, updatedPredio, 'Lugar de Producción asignado al Predio exitosamente');
    } catch (error) {
      next(error);
    }
  }

  async getDepartamentos(req, res, next) {
    try {
      const departamentos = await locationService.getDepartamentos();
      return ApiResponse.success(res, departamentos, 'Departamentos obtenidos');
    } catch (error) {
      next(error);
    }
  }
  async getMunicipios(req, res, next) {
    try {
      const municipios = await locationService.getMunicipios();
      return ApiResponse.success(res, municipios, 'Municipios obtenidos');
    } catch (error) {
      next(error);
    }
  }

  //===LOTES===
  async addLot(req, res, next) {
    try {
      const result = await locationService.registerLot(req.body, req.user.id);
      return ApiResponse.success(res, result, 'Lote registrado adecuadamente', 201);
    } catch (err) { next(err); }
  }

  async getLotesPorLugar(req, res, next) {
    try {
      const { id_lugar } = req.params;
      const lotes = await locationService.getLotesPorLugar(id_lugar);
      return ApiResponse.success(res, lotes, 'Lotes obtenidos');
    } catch (error) {
      next(error);
    }
  }

  async getMyLugares(req, res, next) {
    try {
      const { id_productor } = req.params;
      const lugares = await locationService.getMyLugares(id_productor);
      return ApiResponse.success(res, lugares, 'Lugares obtenidos');
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new LocationController();
