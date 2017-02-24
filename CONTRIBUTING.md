Contributing to react-express-hybrid
======================

You have found a bug or you have an idea for a cool new feature? Contributing code is a great way to give something back to
the open source community. Before you dig right into the code there are a few guidelines that we need contributors to
follow so that we can have a chance of keeping on top of things.

Getting Started
---------------

+ Make sure you have a [GitHub account](https://github.com/signup/free).
+ Make sure you have a [GitLab account](https://gitlab.com/users/sign_in).
+ Submit a [Jira Ticket][jira] for your issue, assuming one does not already exist.
  + Clearly describe the issue including steps to reproduce when it is a bug.
  + Make sure you fill in the earliest version that you know has the issue.
+ Find the corresponding [repository on GitHub](https://github.com/giridharangm/react-express-hybrid),
[fork](https://help.github.com/articles/fork-a-repo/) and check out your forked repository.

Making Changes
--------------

+ Create a _topic branch_ for your isolated work.
  * Usually you should base your branch on the `master` branch.
  * A good topic branch name can be short and descriptive.
  * If you have submitted multiple GitHub/GitLab issues, try to maintain separate branches and pull requests.
+ Make commits of logical units.
  * Make sure your commit messages are meaningful and in the proper format. Your commit message should contain the ID of the GitHub/GitLab issue.
  * e.g. `Close input stream earlier #7`
+ Respect the original code style:
  + Only use spaces for indentation.
  + Create minimal diffs - disable _On Save_ actions like _Reformat Source Code_ or _Organize Imports_. If you feel the source code should be reformatted create a separate PR for this change first.
  + Check for unnecessary whitespace with `git diff` -- check before committing.

Making Trivial Changes
----------------------

The GitHub/GitLab issues are used to generate the changelog for the next release.

For changes of a trivial nature to comments and documentation, it is not always necessary to create a new issue in GitHub/GitLab.
In this case, it is appropriate to start the first line of a commit with '(doc)' instead of a issue number.


Submitting Changes
------------------

+ Push your changes to a topic branch in your fork of the repository.
+ Submit a _Pull Request_.
  * Verify _Files Changed_ shows only your intended changes and does not
  include additional files.
+ Update your GitHub/GitLab issue and include a link to the pull request in the ticket.