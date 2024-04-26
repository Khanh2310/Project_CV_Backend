import { Controller, Get } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { Public } from 'src/auth/decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Subscriber, SubscriberDocument } from 'src/subscribers/schemas';
import { Jobs, JobsDocument } from 'src/jobs/schemas';
import { InjectModel } from '@nestjs/mongoose';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
    @InjectModel(Jobs.name)
    private jobsModel: SoftDeleteModel<JobsDocument>,
  ) {}

  @Get()
  @Public()
  async handleTestEmail() {
    const subscribers = await this.subscriberModel.find({});
    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobsModel.find({
        skills: { $in: subsSkills },
      });
    }
    await this.mailerService.sendMail({
      to: 'example@gmail.com',
      from: 'Support Team <support@example.com>',
      subject: 'Welcome to Nice App! Comfirm your Email',
      template: 'new-job',
    });
  }
}
