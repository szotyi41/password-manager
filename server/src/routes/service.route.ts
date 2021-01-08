import { Router } from 'express';
import ServiceController from '../controllers/service.controller';
import Route from '../interfaces/routes.interface';

class ServiceRoute implements Route {
  public path = '/service';
  public router = Router();
  public serviceController = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.serviceController.getServices);
    this.router.post(`${this.path}`, this.serviceController.saveService);
    this.router.post(`${this.path}/favorite/:id`, this.serviceController.favoriteService);
    this.router.delete(`${this.path}/:id`, this.serviceController.removeService);
  }
}

export default ServiceRoute;
