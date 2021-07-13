import React, { useState, useEffect } from "react";
import { Tag, Input, Select } from "antd";
import { pick, get } from "lodash";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { setFilter } from "../../store/posts/actions";
import tracking from "../../lib/mixpanel";

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
        size="small"
        allowClear
        className="field-width search-input mr"
        placeholder="Search..."
        defaultValue={search}
        onSearch={(value) => {
          setFilter({ search: value });
          if (value) tracking.track("SEARCH", { keyword: value });
        }}
        style={{ width: "160px" }}
      />
      {/* <Select
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
      </Select> */}
      {meta && (
        <div className="show-count">
          Showing {postCount}/{meta.count} posts
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ posts }) => {
  const data = pick(posts, ["meta", "filters"]);

  return {
    ...data,
    postCount: get(posts, "posts.length", 0),
  };
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
