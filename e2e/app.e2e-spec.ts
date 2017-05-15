import { TaskManagerAppPage } from './app.po';

describe('task-manager-app App', () => {
  let page: TaskManagerAppPage;

  beforeEach(() => {
    page = new TaskManagerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
