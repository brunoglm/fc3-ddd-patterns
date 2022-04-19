import EventHandlerInterface from '../../@shared/event-handler-interface'
import eventInterface from '../../@shared/event-interface'

export default class SendToCloudWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: eventInterface): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }
}
