import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../../../core/interfaces/httpStatus.interface'
import { CustomerService } from '../services/customer.service'

export class CustomerControlller {

  static async createCustomer(req: Request, res: Response,next:NextFunction) {
    const user = req.body
    try {
      const userCreated = await CustomerService.createCustomer(user)
      return res.status(HttpStatus.CREATED).send(userCreated)
    } catch (err) {
      next(err)
    }
  }

  static async getCustomers(req: Request, res: Response,next:NextFunction) {
    try {
      const users = await CustomerService.getAllCustomers()
      return res.status(HttpStatus.OK).send(users)
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async getCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params

    try {
      const user = await CustomerService.getCustomerById(id)
      return res.status(HttpStatus.OK).send(user)
    } catch (err) {
      next(err)
    }
  }

  static async updateCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    const user = req.body
    try {
      const userUpdated = await CustomerService.updateCustomerById(id, user)
      return res.status(HttpStatus.OK).send(userUpdated)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCustomer(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    try {
      const userDeleted = await CustomerService.deleteCustomerById(id)
      return res.status(HttpStatus.OK).send(userDeleted)
    } catch (err) {
      next(err)
    }
  }

  static async updateCustomerPassword(req: Request, res: Response,next:NextFunction) {
    const { id } = req.params
    const { password } = req.body
    try {
      const userUpdated = await CustomerService.updateCustomerPassword(id, password)
      return res.status(HttpStatus.OK).send(userUpdated)
    } catch (err) {
      next(err)
    }
  }
}
