import { NextFunction, Request, Response } from 'express';
import { Service } from '../interfaces/service.interface';
import ServiceRoute from '../routes/service.route';
import serviceService from '../services/service.service';

class ServiceController {
  public serviceService = new serviceService();

  public getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllServicesData: Service[] = await this.serviceService.getServices();
      res.status(200).json(findAllServicesData);
    } catch (error) {
      next(error);
    }
  };

  public saveService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData: Service = req.body;
      const saveServiceData: Service = await this.serviceService.saveService(requestData);
      res.status(200).json(saveServiceData);
    } catch (error) {
      next(error);
    }
  };

  public removeService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceId: String = req.params.id;
      const removeServiceData: Service = await this.serviceService.removeService(serviceId);
      res.status(200).json(removeServiceData);
    } catch (error) {
      next(error);
    }
  };

  public favoriteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const serviceId: String = req.params.id;
      const saveServiceData: Service = await this.serviceService.favoriteService(serviceId, 'userid');
      res.status(200).json(saveServiceData);
    } catch (error) {
      next(error);
    }
  };
}

export default ServiceController;
