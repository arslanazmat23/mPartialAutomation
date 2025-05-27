// cypress/support/PageObjectModel/signup.ts
export class SignupPage {
  retrieveEmailVerificationLink(toAddress: string) {
    const serverId = Cypress.env("MAILOSAUR_SERVER_ID") as string;

    cy.mailosaurGetMessage(
      serverId,
      { sentTo: toAddress },
      { timeout: 120_000 }
    ).then((email) => {
      // 1) Try the normal Mailosaur parser first
      const parsedLinks = (email as any).html?.links ?? [];

      // 2) If that comes up empty, fall back to regex on the raw HTML
      let verificationLink: string | undefined = parsedLinks[0]?.href;
      if (!verificationLink) {
        const body = (email as any).html?.body as string;
        // log it so you can tweak the regex if needed
        // eslint-disable-next-line no-console
        console.log("Raw email HTML:", body);

        // Match the SendGrid click-tracking URL
        const rx = /https?:\/\/u[0-9]+\.ct\.sendgrid\.net\/ls\/click[^\s'"]+/;
        const match = body.match(rx);
        if (match) {
          verificationLink = match[0];
        }
      }

      if (!verificationLink) {
        throw new Error(
          `No verification link found for ${toAddress}. Parsed links: ${JSON.stringify(parsedLinks)}`
        );
      }

      cy.log(`Visiting verification link → ${verificationLink}`);
      cy.visit(verificationLink, { failOnStatusCode: false });
      cy.contains("Your email address is verified.").should("be.visible");
    });
  }
}
