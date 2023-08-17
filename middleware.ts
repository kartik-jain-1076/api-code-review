import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Limit the middleware to paths starting with `/api/`

export const config = {
  matcher: [
    "/",
    "/authenticate",
    "/activitySelector",
    "/discover",
    "/detailView",
    "/dayItinerary",
  ],
};

const authRoutes = [
  "/",
  "/activitySelector",
  "/discover",
  "/detailView",
  "/dayItinerary",
];

export function middleware(request: NextRequest) {
  let url = request.nextUrl.pathname;
  const tgAuth = request.cookies.get("tgAuth")?.value;
  //If route is authenticated route.
  if (authRoutes.includes(url)) {
    if (tgAuth) {
      if (url === "/activitySelector") {
        const recommendedDestination = request.cookies.get(
          "recommendedDestination"
        );
        if (recommendedDestination) {
          const newURL = request.nextUrl.clone();
          newURL.pathname = "/discover";
          return NextResponse.redirect(newURL);
        }
      } else if (url === "/") {
        const newURL = request.nextUrl.clone();
        newURL.pathname = "/activitySelector";
        return NextResponse.redirect(newURL);
      } else {
        NextResponse.next();
      }
    } else {
      const newURL = request.nextUrl.clone();
      newURL.pathname = "/authenticate";
      return NextResponse.redirect(newURL);
    }
  }
  if (url === "/authenticate") {
    if (tgAuth) {
      const newURL = request.nextUrl.clone();
      newURL.pathname = "/activitySelector";
      return NextResponse.redirect(newURL);
    } else {
      NextResponse.next();
    }
  }

  // return NextResponse.next();
}
