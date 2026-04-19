const supabase = require('../../config/supabaseClient');
const AppError = require('../../shared/AppError');

class LocationRepository {
  // === Predios ===
  async createPredio(predioData) {
    const { data, error } = await supabase
      .from('predio')
      .insert([predioData])
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    return data;
  }

  async getPrediosByUser(userId) {
    const { data, error } = await supabase
      .from('predio')
      .select('*, municipio:id_municipio (nombre_municipio)')
      .eq('id_usuario_propietario', userId);

    if (error) throw new AppError(error.message, 500);
    return data;
  }

  // === Lugares de Produccion ===
  async createLugarProduccion(lugarData) {
    const { data, error } = await supabase
      .from('lugar_produccion')
      .insert([lugarData])
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    return data;
  }

  async linkLugarToPredio(idLugar, idPredio, userId) {
    // 1. Verificar que el predio le pertenece al usuario
    const { data: predio, error: predioErr } = await supabase
      .from('predio')
      .select('id_usuario_propietario')
      .eq('id', idPredio)
      .single();

    if (predioErr || !predio) throw new AppError('Predio no encontrado', 404);
    if (predio.id_usuario_propietario !== userId) {
      throw new AppError('Solo el propietario del predio puede vincular un lugar de produccion', 403);
    }

    // 2. Actualizar el predio con la foránea del lugar
    const { data, error } = await supabase
      .from('predio')
      .update({ id_lugar_produccion: idLugar })
      .eq('id', idPredio)
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    return data;
  }

  async getDepartamentos() {
    const { data, error } = await supabase
      .from('departamento')
      .select('*');

    if (error) throw new AppError(error.message, 500);
    return data;
  }

  async getMunicipios() {
    const { data, error } = await supabase
      .from('municipio')
      .select('*');

    if (error) throw new AppError(error.message, 500);
    return data;
  }

  async createLot(lotData) {
    const { data, error } = await supabase
      .from('lote')
      .insert([lotData])
      .select()
      .single();

    if (error) throw new AppError(error.message, 400);
    return data;
  }

  async getLotesPorLugar(id_lugar) {
    const { data, error } = await supabase
      .from('lote')
      .select('*')
      .eq('id_lugar_produccion', id_lugar);

    if (error) throw new AppError(error.message, 500);
    return data;
  }

  async getLugaresByProductor(id_productor) {
    const { data, error } = await supabase
      .from('lugar_produccion')
      .select('*')
      .eq('uidProductor', id_productor);

    if (error) throw new AppError(error.message, 500);
    return data;
  }
}
module.exports = new LocationRepository();
