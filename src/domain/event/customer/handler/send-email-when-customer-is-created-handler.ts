import EventHandlerInterface from '../../@shared/event-handler-interface'
import eventInterface from '../../@shared/event-interface'

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: eventInterface): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }
}
