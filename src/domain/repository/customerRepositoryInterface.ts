import RepositoryInterface from "./repositoryInterface";
import Customer from "../entity/customer";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> { }