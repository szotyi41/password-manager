import bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import { Service } from '../interfaces/service.interface';
import serviceModel from '../models/service.model';

class ServiceService {
  public services = serviceModel;

  public async getServices(): Promise<Service[]> {
    const services: Service[] = await this.services.find();
    return services;
  }

  public async saveService(service: Service): Promise<Service> {
    let serviceSave: Service;
    serviceSave = await this.services.findByIdAndUpdate(service._id, service);
    if (!serviceSave) serviceSave = await this.services.create(service);
    return serviceSave;
  }

  public async favoriteService(serviceId: String, userId: String): Promise<Service> {
    const conditions = { _id: serviceId };
    const update = { $set: { favorite_users: userId } };
    const updateService = await this.services.findOneAndUpdate(conditions, update);
    if (!updateService) throw new HttpException(409, 'Service not found');
    return updateService;
  }

  public async removeService(serviceId: String): Promise<Service> {
    const deleteService: Service = await this.services.findByIdAndDelete(serviceId);
    if (!deleteService) throw new HttpException(409, 'Service not found');
    return deleteService;
  }
}

export default ServiceService;
