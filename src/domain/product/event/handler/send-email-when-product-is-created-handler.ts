import EventHandlerInterface from '../../../@shared/event/event-handler-interface'
import eventInterface from '../../../@shared/event/event-interface'

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handler(event: eventInterface): void {
    console.log('Sending email to ...')
  }
}
