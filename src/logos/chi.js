import React from "react";
import PropTypes from "prop-types";

const CHI = props => {
  const { size } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      version="1.1"
      viewBox="0 0 203.388 176.695"
    >
      <path d="M202.27 115.382c0-7.41 7.267-34.927-45.577-76.544l8.882-1.98-4.582-15.077-8.81 5.88v-9.13h-17.305C123.58 10.39 118.15 0 100.386 0c-7.42 0-15.22 1.472-16.916 1.472-1.308 0-5.266-.836-11.992-.836-19.425 0-21.215 14.49-18.79 19.578-25.548 17.504-38.2 30.11-38.2 34.68 0 1.754 1.038 4.04 1.038 7.338C15.526 69.418 0 85.25 0 93.637c0 7.81 9.966 8.352 9.966 8.352.565 2.296-3.298 9.965.165 13.875-4.805 5.218.802 7.822.802 11.968 0 2.804-1.955 3.675-1.955 8.858 0 5.914 2.768 13.018 17.35 13.018 5.76 0 10.862-.895 14.914-.895 1.144 12.24 6.362 17.045 7.222 20.108.707 2.463 2.31 7.776 5.548 7.776 4.23 0 27.564-7.633 45.28-18.388 8.87 3.287 20.168 2.215 24.267 2.215 4.488 0 6.326 2.733 8.976 2.733 1.59 0 13.617-13.464 12.887-42.913 7.55 12.77 12.015 21.074 12.45 25.833 9.802-3.5 18.036-26.646 14.478-41.394 0 0 12.333 20.014 31.04 17.07-.06.044-1.12-3.643-1.12-6.47z" />
      <path
        d="M84.73 133.676c4.524-6.95 1.945-18.906-6.666-15.596-4.97-8.116-10.602-19.118-10.602-32.7 0-14.477 2.957-18.27 2.957-31.063 0-21.792-10.084-26.104-16.55-30.486-15.41 10.425-35.847 24.714-35.847 32.312 0 2.238.99 4.347.99 6.55 0 7.868-15.315 23.146-15.315 30.544 0 2.78 2.215 5.1 5.772 5.1s12.616-1.283 16.02-1.683c3.404-.342 3.78-2.003 3.78-2.898 0-2.215-3.498-5.29-6.148-5.29-2.215 0-2.415 1.297-2.415 1.627 0 1.45 2.085 1.86 2.085 1.86 2.65-.352 2.662 1.968.14 1.968-2.072 0-4.393-1.53-4.393-4.17 0-2.65 2.12-3.31 3.698-3.31 6.62 0 10.425 5.984 9.33 9.8 8.21 4.077 7.974 10.05 6.62 10.05-2.84 0-.873-7.552-11.557-7.552-2.99 0-9.258.895-10.742 1.06-1.45.165-1.897.377-2.073 1.614-.188 1.202-1.732 5.62-1.732 8.328 0 4.005 2.674 4.276 4.394 4.276 4.5 0 12.12-1.084 12.12-2.874 0-1.178-1.93-.825-2.638-.825-1.356 0-1.968-.825-1.968-1.308 0-1.203 1.944-1.768 4.252-1.768 3.828 0 4.23 2.51 4.04 3.663-.424 2.58 3.722 1.955 3.722 7.433 0 .624-.047 2.19-1.355 2.19-1.318 0-1.33-1.636-1.33-2.555 0-.895-1.496-2.344-2.78-2.344-1.355 0-6.28 2.532-16.88 1.566-4.182 5.266.754 5.642.754 10.955 0 5.914-1.814 5.55-1.814 9.154 0 7.197 7.892 9.07 15.773 9.07 16.303 0 34.703-3.77 41.182-15.443-2.215 10.308-10.52 13.995-24.643 17.21 1.602 11.44 3.97 14.078 5.69 17.164 1.72 3.11 2.097 7.433 5.136 7.433 3.64 0 25.09-7.727 39.52-16.433L84.73 133.677z"
        fill="#D18A00"
      />
      <path d="M64.352 111.06c-3.133-3.405-7.833-13.3 1.508-21.77-7.138-1.92-16.963 17.186-1.508 21.77zm-11.18-65.967a1.222 1.222 0 0 0 1.697.165c.376-.33.635-1.12.14-1.696-.14-.177-3.275-3.887-7.657-7.48.518-.39 1.202-.895 1.932-1.45 1.86 1.556 9.07 7.74 13.606 13.383.437.518 1.18.59 1.697.177.518-.412.577-1.154.188-1.673-4.44-5.514-11.12-11.31-13.51-13.37.788-.566 1.47-1.097 1.825-1.344 4.865 3.534 7.62 6.926 7.657 6.962.412.518 1.166.6 1.673.188.518-.424.624-1.166.212-1.684-.153-.188-3.263-3.993-8.87-7.928-.424-.306-.978-.294-1.414.024l-7.633 5.713c-.707.52-.565 1.45-.024 1.91 4.773 3.71 8.448 8.055 8.483 8.103zM50.89 55.105c-7.268 0-9.66-7.798-18.79-7.798-4.9 0-7.42 1.92-7.42 3.546s1.897 3.05 1.897 3.05c.92 2.004-5.442 4.195-2.097 5.537l4.11 1.602c-1.33 2.332-.47 6.656-.21 7.74-8.412.07-7.6 2.685-.307 2.79.025 1.203-.835 4.418.472 4.418 1.378 0 3.145-1.614 3.817-4.677 6.124-.754 13.027-2.862 13.027-2.862 1.225-.34 2.462-1.46.094-2.86l-11.26-6.633s-.966-.565-.33-2.038l.86-1.992c.247-.6.86-.683 1.154-.683 3.204 0 8.022 4.794 14.383 4.794 2.756 0 5.83-1.615 5.83-3.17s-3.78-.765-5.23-.765z" />
      <path
        d="M33.466 62.94c-.624 2.33-.188 5.005-.035 5.712 7.222-.436 10.18-1.755 10.18-1.755L33.465 62.94zm-11.12 60.016c-.79.39 2.427 7.068 1.85 10.06.482 1.355 2.485 6.326 5.865 4.606 3.37-1.72.52-6.23-.293-7.433-2.78-1.31-6.632-7.658-7.42-7.234zm29.767-47.39c-2.792.743-5.348 3.51-10.4 4.866-1.874.483-5.15.012-6.126.012.766 1.037 2.78 2.84 2.78 2.84s-.742 1.837-.895 3.097c.836-.494 3.287-1.978 5.16-2.46 5.065-1.332 8.646-.166 11.438-.896 1.308-.365 3.71-1.025 2.745-4.735-.968-3.69-3.406-3.09-4.702-2.723z"
        fill="#FFF"
      />
      <path
        d="M81.774 119.15c-3.086-.894-6.75 2.345-8.175 7.222-1.415 4.877-.06 9.553 3.015 10.472 3.086.895 6.738-2.32 8.163-7.22 1.426-4.877.06-9.577-3.004-10.473zm-55.835 2.145c-1.51-2.097-2.322-.212-3.924.648-1.602.8-3.64.365-2.78 2.804.907 2.65-1.013 8.034-.177 9.66.682 1.307 2.143 1.813 3.333 1.224 1.072-.576 1.59-1.52 1.802-2.626.577-2.992-1.154-7.127-.365-7.55.777-.413 3.145 3.427 5.913 4.71 1.013.46 2.085.602 3.17.072 1.19-.624 1.625-2.144.965-3.45-.848-1.627-6.325-3.217-7.94-5.49zm21.827-35.74c-.825.225-2.085.932-4.158 1.485-2.062.554-4.654.565-5.066-1.025a.744.744 0 0 1-.012-.424c.153-1.283 2.026-2.99 2.026-2.99s-2.474-.555-3.24-1.603a1.372 1.372 0 0 1-.2-.377c-.423-1.578 1.862-2.85 3.924-3.393 2.05-.554 3.51-.554 4.347-.754 1.672-.448 3.073-1.555 2.732-2.874-.67-2.463-3.864-1.862-5.63-1.403-8.836 2.332-10.79 5.96-10.143 8.48.66 2.51 3.52 3.158 3.52 3.158s-2.166 1.98-1.507 4.488c.648 2.497 4.146 4.688 12.98 2.368 1.78-.47 4.866-1.52 4.23-3.97-.367-1.353-2.146-1.6-3.806-1.164zm90.48-48.826C112.47 56.023 98.606 84.79 94.39 94.637c0 0-.554 1.154.094 2.415l8.163 15.903c.342.67 1.072.777 1.626.27l13.43-12.12c.918-.848 1.224-2.19 1.224-2.19 6.125-35.046 14.383-52.173 19.53-59.936a5.808 5.808 0 0 1-.258-1.743c.046-.178.046-.343.046-.508z"
        fill="#CF0A2C"
      />
      <path
        d="M159.638 26.457l-6.926 4.582 1.614 5.276 7.775-1.72-2.462-8.14zm-19 16.09a6.412 6.412 0 0 1-1.285-1.542c-8.258 13.24-18.8 46.365-18.8 74.718 0 29.013 8.882 44.42 12.074 44.42 2.462 0 11.155-15.525 11.155-35.55 0-5.478-4.582-27.4-4.582-68.57.012-8.81.672-11.166 1.437-13.475zm-44.21 52.95l7.315 15.81 13.31-12.334s6.42-37.436 17.86-58.074C104.72 70.182 96.427 95.497 96.427 95.497zm48.898-63.62a5.38 5.38 0 0 0-5.383 5.382c0 2.98 2.415 5.382 5.383 5.382s5.383-2.403 5.383-5.383-2.416-5.384-5.384-5.384z"
        fill="#00833E"
      />
      <path
        d="M124.3 41.712c1.79 0 1.566-2.415-.12-2.415-25.796 0-40.58 3.275-42.853 3.817-1.437-12.64-8.705-16.68-8.705-24.855 0-3.182 2.097-3.818 3.817-3.818 6.03 0 10.554 7.068 18.917 7.068 7.775 0 9.447-5.513 13.888-5.513 6.644 0 3.722 17.693 15.502 17.693 3.722 0 6.16-1.484 6.16-1.484 1.615-.883.095-2.78-1.26-2.073 0 0-2.367 1.213-4.687 1.213-9.966 0-5.62-17.752-15.96-17.752-4.96 0-6.62 5.466-13.77 5.466-8 0-11.168-7.15-19.096-7.15-4.5 0-6.114 3.004-6.114 6.03 0 9.06 8.94 15.95 8.94 28.366 0 12.64-4.31 23.748-4.31 41.3 0 20.46 19.436 26.492 19.436 45.564 0 10.79 4.146 17.434 8.764 17.434 2.544 0 4.912-1.496 6.043-5.454.67.27 1.26.412 1.79.412 1.31 0 6.138-1.402 6.138-7.09 0-16.27-27.94-24.668-27.94-50.147 0-12.25 1.967-31.852 4.97-31.852 1.58 0 3.547 6.856 7.304 6.856 4.665 0 3.04-13.536 5.112-13.536 1.673 0 4.158 6.326 7.115 6.326 2.392 0 3.182-4.912 4.206-8.764.39-1.802-2.144-2.297-2.51-.483-.647 2.862-2.002 6.656-2.002 6.656-1.543-1.52-3.982-6.162-6.95-6.162-4.735 0-4.04 13.51-5.112 13.51-1.98 0-3.228-7.02-7.55-7.02-5.56 0-7.198 19.342-7.198 34.562 0 26.775 27.965 35.75 27.965 49.78 0 3.523-2.58 4.736-3.617 4.736-.412 0-.825-.118-1.26-.247.14-.967.212-2.05.212-3.24 0-8.258-4.547-9.824-6.396-9.824-1.84 0-2.887 1.614-2.887 4.276 0 3.57 3.157 7.527 6.23 9.8-.47 2.227-1.436 4.277-3.51 4.277-4.016 0-6.3-9.32-6.3-14.89 0-20.132-19.426-25.952-19.426-46.06 0-17.127 4.323-28.105 4.323-39.484 0-.695-.012-1.378-.047-2.06 2.66-.594 19.305-4.316 42.746-3.774z"
        fill="#FFD100"
      />
      <path d="M103.626 132.156c-.365 0-.73.53-.73 1.908 0 1.567 1.755 4.806 3.946 6.95.07-1.107.06-2.026.06-2.51-.002-1.813-1.026-6.348-3.276-6.348z" />
      <path
        d="M137.292 48.085s-14.7 30.945-14.7 67.003c0 23.877 7.408 42.124 9.458 42.124 1.614 0 9.153-11.367 9.153-35.092 0-9.565-5.17-45.964-3.91-74.035z"
        fill="#FFD100"
      />
      <path
        d="M130.283 93.507l-5.313 4.1c-.624 5.135-1.037 10.448-1.107 15.902l5.843-3.983c.047-4.664.2-10 .577-16.02zm3.935-24.22a427.003 427.003 0 0 0-2.144 23.584l5.937 4.383c-.8-8.73-1.636-18.506-2.002-27.847-.047-1.33-1.52-2.58-1.79-.118zm-2.792 41.147l8.234 5.678c-.294-4.56-.895-10.496-1.52-17.092l-6.16-4.582a316.38 316.38 0 0 0-.554 15.996zm.99-41.087c.21-1.614-1.132-1.355-1.403-.412-2.226 7.54-4.44 16.74-5.82 26.822l5.172-3.982a454.409 454.409 0 0 1 2.05-22.428zm-7.27 63.08c.413 2.756.896 5.313 1.45 7.633.848.92 3.216 2.603 5.218-3.404 3.404 5.642 5.548 4.9 6.208 4.417.46-2.073.872-4.347 1.202-6.88l-8.163-5.43-5.913 3.664zm6.786-4.712l7.48 4.995a99.03 99.03 0 0 0 .554-10.555c0-1.178-.07-2.627-.165-4.3l-8.374-5.748c-.024 7.115.282 12.333.506 15.608zm-2.25-16.538l-5.82 3.982c0 5.7.413 11.025 1.085 15.807l5.242-3.263c-.284-3.51-.53-9.036-.508-16.527z"
        fill="#00833E"
      />
      <g fill="#CF0A2C">
        <path d="M106.347 78.5c-3.57 5.878-6.467 12.12-7.74 15.007-.506 1.237-.718 1.932-.718 1.932l6.278 13.546 11.568-10.767c.14-.602 1.178-6.362 2.968-14.148 2.603-11.026 6.95-27.176 11.733-36.976-10.555 11.402-19.072 23.405-24.09 31.404z" />
        <circle cx="145.326" cy="37.247" r="3.44" />
      </g>
      <path
        d="M122.002 59.64c-.294-.153-.695-.035-.825.27a252.026 252.026 0 0 0-6.28 13.43l-7.35 3.25c-.412.65-.79 1.26-1.166 1.886l7.776-3.44c-2.026 4.76-3.663 9.082-5.042 12.84l-9.8 3.97a75.064 75.064 0 0 0-.684 1.637l9.918-4.03c-3.04 8.66-4.288 13.983-4.323 14.066-.07.317.13.694.47.73a.623.623 0 0 0 .743-.484c.024-.07 1.225-5.17 4.146-13.547l5.266 8.846.895-.848.024-.024-5.643-9.494c1.225-3.44 2.71-7.362 4.512-11.662l4.075 7.01c.14-.59.247-1.18.412-1.78l-3.864-6.68c1.98-4.664 4.276-9.753 7.02-15.124.155-.282.014-.635-.28-.824z"
        fill="#FFF"
      />
      <path
        d="M149.237 21.392h-11.344l7.244 7.845h4.1v-7.845zm42.053 56.495c-12.357-19.86-33.937-36.552-38.885-40.25-.07 1.142-1.178 3.026-1.72 3.957-.67.72-1.45 1.567-1.838 1.79.848 3.43 2.167 8.33 3.91 14.02 2.604 6.313 5.502 14.1 7.964 22.215 2.805 6.713 6.068 13.404 9.755 19.33 15.302 24.595 30.58 21.214 30.58 21.214-2.627-4.18 5.077-18.376-9.765-42.277z"
        fill="#FF671B"
      />
      <path
        d="M186.72 79.3c-9.754-15.7-30.533-34.372-35.245-38.53-.27.518-.648 1-1.06 1.437 2.968 8.434 14.536 40.098 25.197 57.226 10.4 16.75 20.567 15.926 20.567 15.926s3.415-15.303-9.46-36.06z"
        fill="#FFF"
      />
      <g fill="#FF671B">
        <path d="M151.98 42.937c1.662 4.618 4.925 13.51 8.977 23.347l1.084-5.96-5.288-8.506a.624.624 0 0 1 .212-.872c.318-.177.695-.094.848.212l5.09 8.128 7.844 1.944c-7.492-8.02-15.066-15.007-18.765-18.293z" />
        <path d="M163.796 60.818l9.365 15.054 12.158 3.593c-3.428-5.407-8.14-11.167-13.04-16.55l-8.482-2.097zm-1.98 7.61c2.274 5.466 4.784 11.155 7.363 16.492l3.038-8.2-9.2-14.806-1.2 6.514zm33.302 45.646c.27-2.368.695-8.693-1.885-17.422l-8.057-1.472 4.735 7.633c.213.27.095.67-.21.848-.272.19-.696.095-.873-.21l-4.783-7.728-3.04 9.082c6.316 7.515 11.923 8.964 14.114 9.27zm-20.967-36.6l10.12 16.27 8.54 1.554c-1.355-4.264-3.404-9.082-6.514-14.23l-12.145-3.593zm5.914 26.2l3.133-9.32-10.12-16.29-3.11 8.422c2.216 4.5 4.465 8.705 6.692 12.286 1.154 1.838 2.285 3.476 3.404 4.9z" />
      </g>
      <g fill="#D18A00">
        <path d="M32.43 53.456l-4.583 1.225c-.966.248-1.013.802-.094 1.25l3.475 1.673a.7.7 0 0 0 .942-.342l1.19-2.732c.342-.813-.082-1.296-.93-1.072z" />
        <ellipse
          transform="rotate(-73.776 79.208 128.007)"
          cx="79.206"
          cy="128.01"
          rx="5.843"
          ry="3.239"
        />
      </g>
      <path
        d="M160.722 79.63c-2.462-8.103-5.36-15.89-7.963-22.215-1.744-5.7-3.064-10.602-3.912-14.018a7.165 7.165 0 0 1-4.994.776c-.67-.14-1.26-.377-1.86-.683-2.192 50.795 2.85 59.583 3.768 74.095 12.816 20.202 13.276 26.092 13.276 26.092s14.972-10.496 11.532-41.64a70.922 70.922 0 0 1-1.425-2.216 124.662 124.662 0 0 1-5.89-10.742"
        fill="#FFD100"
      />
      <path
        d="M164.95 97.618a105.864 105.864 0 0 0-1.707-8.54c-.73-3.157-1.614-6.326-2.533-9.436-2.462-8.104-5.383-15.89-7.963-22.216-2.556-6.196-4.76-10.967-5.82-13.264-.53.118-1.06.188-1.613.188-.507 0-1.013-.06-1.472-.153-.483 5.466-2.226 28.837 1.107 49.875 4.758 30.18 16.22 41.11 16.22 41.11s7.927-11.4 3.78-37.564z"
        fill="#001970"
      />
      <path
        d="M150.25 78.405l-3.958-25.02c-.188-1.13-1.684-.99-1.743.648-.32 7.598-.46 18.306.458 29.237l5.242-4.865zm4.17 26.387l-1.955-12.37-5.5 5.467c.87 4.605 1.907 8.692 3.015 12.356l4.44-5.454zm-9.283-19.86c.27 2.99.67 5.983 1.13 8.928.142.836.248 1.66.39 2.45l5.572-5.478-1.72-10.85-5.373 4.95zm2.462-31.747s2.05 12.958 4.004 25.362l8.835 4.97c-3.288-11.814-7.917-23.37-11.227-31.05-.365-.978-1.838-.766-1.614.718zm10.248 65.92c-.094-.413-2.368-9.707-3.086-12.652l-4.323 5.29c1.566 4.852 3.238 8.857 4.83 12.026.822-1.51 2.413-4.36 2.578-4.666zm-5.985-38.897c.577 3.593 1.154 7.162 1.66 10.45l9.896 5.64c-.625-3.592-1.473-7.28-2.463-10.978l-9.094-5.112zm1.91 12.097c.94 5.843 1.683 10.507 1.954 12.263l9.07 4.9c-.118-3.45-.46-7.268-1.107-11.51l-9.918-5.653zm9.87 32.112l-4.9-4.205-2.756 4.995c2.05 3.793 3.84 6.302 4.97 7.68.73-1.567 1.838-4.347 2.686-8.47zm1.166-13.43l-8.742-4.71c.67 2.697 2.58 10.577 3.063 12.556l4.784 4.123c.577-3.275.966-7.256.895-11.968z"
        fill="#FFD100"
      />
    </svg>
  );
};

CHI.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CHI.defaultProps = {
  size: "100"
};

export default CHI;
