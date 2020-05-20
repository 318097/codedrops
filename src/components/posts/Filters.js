import React, { useState, useEffect } from "react";
import { Tag, Input, Select } from "antd";

import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { setFilter } from "../../store/posts/actions";

const { Search } = Input;
const { Option } = Select;

const Filters = ({ setFilter, filters, meta, tagList = [], postCount }) => {
  // useEffect(() => {
  //   if (!location.search) {
  //     setFilters({
  //       search: "",
  //       tags: [],
  //       type: "",
  //       page: 1
  //     });
  //     return;
  //   }

  //   const { tags = [], search, type, page } = queryString.parse(
  //     location.search,
  //     { arrayFormat: "comma" }
  //   );

  //   setFilters({
  //     search,
  //     type,
  //     page: Number(page) || 1,
  //     tags: [].concat(tags)
  //   });
  // }, [location]);

  // const handleTagClose = selectedTag => () => {
  //   let { tags = [] } = filters;
  //   tags = tags.filter(tag => tag !== selectedTag);
  //   const queryParams = { ...filters, tags };
  //   const query = queryString.stringify(queryParams, { arrayFormat: "comma" });
  //   history.push(`/posts?${query}`);
  // };

  const handleTagFilter = (values) => setFilter({ tags: values });

  const { tags = [], search = "" } = filters || {};

  return (
    <div className="filters">
      <Search
        allowClear
        className="field-width"
        placeholder="Search..."
        defaultValue={search}
        onSearch={(value) => setFilter({ search: value })}
        style={{ marginRight: "4px" }}
      />
      <Select
        mode="multiple"
        className="field-width"
        style={{ minWidth: "150px" }}
        placeholder="Tags"
        value={tags}
        onChange={handleTagFilter}
      >
        {tagList.map(({ label, value }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
      {postCount > 0 && (
        <div>
          Showing {postCount} of {meta.count} posts.
        </div>
      )}
    </div>
  );
};
const mapStateToProps = ({ posts }) => ({
  meta: posts.meta,
  tagList: posts.tags,
  filters: posts.filters,
  postCount: posts.length,
});

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
