import EventHandlerInterface from '../../@shared/event-handler-interface'
import eventInterface from '../../@shared/event-interface'

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: eventInterface): void {
    console.log('Sending email to ...')
  }
}
