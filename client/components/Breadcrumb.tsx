import Link from "next/link";
import React from "react";

// Define types for the props
interface Crumb {
  href: string;
  label: string;
  icon?: boolean;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
  fontColor?: string;
}

function Breadcrumb({ crumbs, fontColor = "grey" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="mx-4 my-2 p-2 flex items-center gap-1 text-sm md:text-lg text-gray-600">
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li>
              <Link
                href={crumb.href}
                className={`block transition text-${fontColor} hover:text-gray-700`}
              >
                {crumb.icon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={fontColor}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                ) : (
                  crumb.label
                )}
              </Link>
            </li>
            {index < crumbs.length - 1 && (
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill={fontColor}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
