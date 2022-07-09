import { Component, OnInit } from '@angular/core';
import { Icon } from '@visurel/iconify-angular';

import icSearch from '@iconify/icons-ic/twotone-search';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import icDescription from '@iconify/icons-ic/twotone-description';
import icMovieFilter from '@iconify/icons-ic/twotone-movie-filter';
import { MatDialog } from '@angular/material/dialog';

import { trackById } from '../../../@vex/utils/track-by';
import { stagger60ms } from '../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
// components
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';

export enum QuestionCategory {
  firstSteps,
  accountSettings,
  apiHelp,
  billing,
}
export interface Question {
  id: number;
  label: string;
  icon: Icon;
  category: QuestionCategory;
  onClick: (question: Question) => void;
}

@Component({
  selector: 'vex-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class QuestionsComponent implements OnInit {

  questions: Question[] = [
    {
      id: 1,
      label: 'How secure is my password?',
      icon: icDescription,
      category: QuestionCategory.accountSettings,
      onClick: question => this.openDialog(question)
    },
    {
      id: 2,
      label: 'Can I change my username?',
      icon: icDescription,
      category: QuestionCategory.accountSettings,
      onClick: question => this.openDialog(question)
    },
    {
      id: 3,
      label: 'How do I change my email?',
      icon: icMovieFilter,
      category: QuestionCategory.accountSettings,
      onClick: question => this.openDialog(question)
    },
    {
      id: 4,
      label: 'Where can I change my timezone?',
      icon: icDescription,
      category: QuestionCategory.accountSettings,
      onClick: question => this.openDialog(question)
    },
    {
      id: 5,
      label: 'How do I change my password?',
      icon: icMovieFilter,
      category: QuestionCategory.accountSettings,
      onClick: question => this.openDialog(question)
    },
    {
      id: 6,
      label: 'Which technologies are used?',
      icon: icDescription,
      category: QuestionCategory.apiHelp,
      onClick: question => this.openDialog(question)
    },
    {
      id: 7,
      label: 'How do I make a request?',
      icon: icMovieFilter,
      category: QuestionCategory.apiHelp,
      onClick: question => this.openDialog(question)
    },
    {
      id: 8,
      label: 'What are the API Limits?',
      icon: icDescription,
      category: QuestionCategory.apiHelp,
      onClick: question => this.openDialog(question)
    },
    {
      id: 9,
      label: 'How can I apply for the API?',
      icon: icMovieFilter,
      category: QuestionCategory.apiHelp,
      onClick: question => this.openDialog(question)
    },
    {
      id: 10,
      label: 'When can I start developing?',
      icon: icDescription,
      category: QuestionCategory.apiHelp,
      onClick: question => this.openDialog(question)
    },
    {
      id: 11,
      label: 'Can I get a refund?',
      icon: icDescription,
      category: QuestionCategory.billing,
      onClick: question => this.openDialog(question)
    },
    {
      id: 12,
      label: 'How do I pay?',
      icon: icMovieFilter,
      category: QuestionCategory.billing,
      onClick: question => this.openDialog(question)
    },
    {
      id: 13,
      label: 'Which payment methods are supported?',
      icon: icMovieFilter,
      category: QuestionCategory.billing,
      onClick: question => this.openDialog(question)
    },
    {
      id: 14,
      label: 'Do I need to pay VAT?',
      icon: icDescription,
      category: QuestionCategory.billing,
      onClick: question => this.openDialog(question)
    },
    {
      id: 15,
      label: 'Where do I find my purchase code?',
      icon: icDescription,
      category: QuestionCategory.billing,
      onClick: question => this.openDialog(question)
    },
    {
      id: 16,
      label: 'How do I download the template?',
      icon: icDescription,
      category: QuestionCategory.firstSteps,
      onClick: question => this.openDialog(question)
    },
    {
      id: 17,
      label: 'Installation Guide',
      icon: icMovieFilter,
      category: QuestionCategory.firstSteps,
      onClick: question => this.openDialog(question)
    },
    {
      id: 18,
      label: 'Creating your first page',
      icon: icMovieFilter,
      category: QuestionCategory.firstSteps,
      onClick: question => this.openDialog(question)
    },
    {
      id: 19,
      label: 'Customizing your template',
      icon: icDescription,
      category: QuestionCategory.firstSteps,
      onClick: question => this.openDialog(question)
    },
    {
      id: 20,
      label: 'How do I contact support?',
      icon: icDescription,
      category: QuestionCategory.firstSteps,
      onClick: question => this.openDialog(question)
    }
  ];

  accountSettings = this.questions.filter(question => question.category === QuestionCategory.accountSettings);
  apiHelp = this.questions.filter(question => question.category === QuestionCategory.apiHelp);
  billing = this.questions.filter(question => question.category === QuestionCategory.billing);
  firstSteps = this.questions.filter(question => question.category === QuestionCategory.firstSteps);

  trackById = trackById;
  icSearch = icSearch;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(question: Question) {
    this.dialog.open(QuestionDialogComponent, {
      data: question,
      width: '600px'
    });
  }
}
